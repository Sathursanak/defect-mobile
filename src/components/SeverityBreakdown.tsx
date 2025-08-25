import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import PieChart from 'react-native-pie-chart';

interface DefectData {
  total: number;
  reopen: number;
  closed: number;
  new: number;
  reject: number;
  open: number;
  duplicate: number;
  fixed: number;
}

interface SeverityBreakdownProps {
  defectData: Record<string, DefectData>;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Calculate responsive card width based on screen size
const getCardWidth = () => {
  // Make a bit more than 2 cards visible at once (e.g., 2.3 cards)
  const availableWidth = SCREEN_WIDTH - 48; // Account for padding and gaps
  const cardWidth = availableWidth / 2.3;
  return Math.max(cardWidth, 120); // Minimum width of 120
};

const SeverityBreakdown: React.FC<SeverityBreakdownProps> = ({
  defectData,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('high');
  const scrollRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);

  // Scroll amount per click (in px)
  const SCROLL_AMOUNT = getCardWidth() + 8; // card width + gap

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: Math.max(0, scrollX - SCROLL_AMOUNT),
        animated: true,
      });
    }
  };
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: scrollX + SCROLL_AMOUNT,
        animated: true,
      });
    }
  };

  const handleViewChart = (severity: string) => {
    setSelectedSeverity(severity);
    setModalVisible(true);
  };

  const renderPieChart = (data: DefectData) => {
    const total = data.total;
    const segments = [
      { value: data.new, color: '#3b82f6', label: 'NEW' },
      { value: data.fixed, color: '#22c55e', label: 'FIXED' },
      { value: data.closed, color: '#16a34a', label: 'CLOSED' },
      { value: data.open, color: '#eab308', label: 'OPEN' },
      { value: data.reopen, color: '#ef4444', label: 'REOPEN' },
      { value: data.reject, color: '#7f1d1d', label: 'REJECT' },
      { value: data.duplicate, color: '#6b7280', label: 'DUPLICATE' },
    ].filter(segment => segment.value > 0);

    // Prepare data for PieChart component
    const widthAndHeight = 200;
    const series = segments.map(segment => ({
      value: segment.value,
      color: segment.color,
    }));

    return (
      <View style={styles.pieChartContainer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Defects</Text>
          <Text style={styles.totalValue}>{total}</Text>
        </View>

        {/* Actual Pie Chart */}
        {total > 0 && (
          <View style={styles.pieChartWrapper}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              cover={{ radius: 0.45, color: '#FFF' }}
            />
          </View>
        )}

        {/* Legend */}
        <View style={styles.chartLegend}>
          {segments.map((segment, index) => (
            <View key={index} style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendSquare,
                    { backgroundColor: segment.color },
                  ]}
                />
                <Text style={styles.legendText}>{segment.label}</Text>
              </View>
              <Text style={styles.legendValue}>
                {segment.value} ({((segment.value / total) * 100).toFixed(1)}%)
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Map severity keys to display names and colors
  // Add or edit severities here as needed
  const severityMeta: Record<string, { title: string; color: string }> = {
    critical: { title: 'Critical', color: '#b71c1c' },
    blocker: { title: 'Blocker', color: '#88470eff' },
    high: { title: 'High', color: '#c62828' },
    medium: { title: 'Medium', color: '#f9a825' },
    low: { title: 'Low', color: '#2ecc40' },
    minor: { title: 'Minor', color: '#039be5' },
  };

  // Dynamically get all severities from defectData
  const severities = Object.keys(defectData);

  return (
    <View>
      <Text style={styles.sectionTitle}>Defect Severity Breakdown</Text>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
      >
        {/* Left chevron */}
        <TouchableOpacity onPress={handleScrollLeft}>
          <Ionicons
            name="chevron-back"
            size={28}
            color="#bbb"
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.defectCardsScrollContainer}
          onScroll={e => setScrollX(e.nativeEvent.contentOffset.x)}
          scrollEventThrottle={16}
        >
          {severities.map(key => {
            const data = defectData[key];
            const meta = severityMeta[key] ||
              severityMeta.default || { title: key, color: '#888' };
            return (
              <View
                key={key}
                style={[
                  styles.defectCard,
                  { borderTopColor: meta.color, width: getCardWidth() },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text
                    style={[styles.defectCardTitle, { color: meta.color }]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {meta.title}
                  </Text>
                  <Text style={styles.defectTotal}>{data.total}</Text>
                </View>

                <View style={styles.defectStatsGrid}>
                  {/* Render all statuses dynamically */}
                  {Object.entries(data).map(([status, value]) => {
                    if (status === 'total') return null;
                    // Assign a color for each status (customize as needed)
                    const statusColors: Record<string, string> = {
                      reopen: '#c62828',
                      closed: '#2ecc40',
                      new: '#f9a825',
                      fixed: '#3b82f6',
                      open: '#eab308',
                      reject: '#7f1d1d',
                      duplicate: '#6b7280',
                    };
                    return (
                      <View style={styles.statItem} key={status}>
                        <View
                          style={[
                            styles.dot,
                            { backgroundColor: statusColors[status] || '#bbb' },
                          ]}
                        />
                        <Text
                          style={styles.statText}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {status.toUpperCase()}
                        </Text>
                        <Text style={styles.statValue}>{value}</Text>
                      </View>
                    );
                  })}
                </View>

                <TouchableOpacity
                  style={[
                    styles.viewChartButton,
                    {
                      backgroundColor: meta.color + '20',
                      borderColor: meta.color,
                    },
                  ]}
                  onPress={() => handleViewChart(key)}
                >
                  <Text style={[styles.viewChartText, { color: meta.color }]}>
                    View Chart
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        {/* Right chevron */}
        <TouchableOpacity onPress={handleScrollRight}>
          <Ionicons
            name="chevron-forward"
            size={28}
            color="#bbb"
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {(severityMeta[selectedSeverity]?.title || selectedSeverity) +
                  ' Chart'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            {renderPieChart(defectData[selectedSeverity])}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b7280',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  defectCardsScrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
    alignItems: 'stretch',
    paddingBottom: 8,
  },
  defectCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderTopWidth: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 160,
    marginRight: 8,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  defectCardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 16,
  },
  defectTotal: {
    fontSize: 20,
    color: '#1a2a5c',
    fontWeight: 'bold',
  },
  defectStatsGrid: {
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingVertical: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
    flexShrink: 0,
  },
  statText: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: '500',
    flex: 1,
    textAlign: 'left',
  },
  statValue: {
    fontSize: 11,
    color: '#1a2a5c',
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'right',
  },
  viewChartButton: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 4,
    minWidth: 80,
  },
  viewChartText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: SCREEN_WIDTH * 0.9,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a2a5c',
  },
  pieChartContainer: {
    alignItems: 'center',
  },
  pieChart: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  pieCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    position: 'relative',
    backgroundColor: '#f8f9fa',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  svgPie: {
    position: 'absolute',
  },
  chartLegend: {
    width: '100%',
    paddingHorizontal: 20,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendSquare: {
    width: 16,
    height: 12,
    marginRight: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  legendValue: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  totalSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginHorizontal: 20,
  },
  totalLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 32,
    color: '#1a2a5c',
    fontWeight: 'bold',
  },
  pieChartWrapper: {
    alignItems: 'center',
  },
});

export default SeverityBreakdown;
