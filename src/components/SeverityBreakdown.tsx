import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PieChart from 'react-native-pie-chart';
import { severityBreakdownApi, SeverityBreakdownItem, StatusBreakdownItem } from '../services/severityBreakdown';

interface SeverityBreakdownProps {
  projectId: number;
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
  projectId,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityBreakdownItem | null>(null);
  const [severityData, setSeverityData] = useState<SeverityBreakdownItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);

  // Scroll amount per click (in px)
  const SCROLL_AMOUNT = getCardWidth() + 8; // card width + gap

  // Fetch severity breakdown data when project changes
  useEffect(() => {
    if (projectId) {
      fetchSeverityBreakdown();
    }
  }, [projectId]);

  const fetchSeverityBreakdown = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await severityBreakdownApi.getSeverityBreakdown(projectId);
      setSeverityData(data);
    } catch (err) {
      console.error('Failed to fetch severity breakdown:', err);
      setError('Failed to load severity data');
    } finally {
      setLoading(false);
    }
  };

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

  const handleViewChart = (severity: SeverityBreakdownItem) => {
    setSelectedSeverity(severity);
    setModalVisible(true);
  };

  const renderPieChart = (severity: SeverityBreakdownItem) => {
    const total = severity.total_defects;
    const statusBreakdown = severity.status_breakdown;

    // Convert status breakdown to chart segments
    const segments = Object.values(statusBreakdown).map(status => ({
      value: status.count,
      color: status.status_color,
      label: status.status_name.toUpperCase(),
    })).filter(segment => segment.value > 0);

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

  // Helper function to get severity color
  const getSeverityColor = (severityColor: string): string => {
    const colorMap: Record<string, string> = {
      'Red': '#dc2626',
      'Orange': '#ea580c',
      'Yellow': '#ca8a04',
      'Green': '#16a34a',
      'Blue': '#2563eb',
      'Purple': '#9333ea',
    };
    return colorMap[severityColor] || '#6b7280';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a2a5c" />
        <Text style={styles.loadingText}>Loading severity data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchSeverityBreakdown}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (severityData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No severity data available for this project</Text>
      </View>
    );
  }

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
          {severityData.map((severity) => {
            const severityColor = getSeverityColor(severity.severity_color);
            return (
              <View
                key={severity.severity_id}
                style={[
                  styles.defectCard,
                  { borderTopColor: severityColor, width: getCardWidth() },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text
                    style={[styles.defectCardTitle, { color: severityColor }]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {severity.severity_name}
                  </Text>
                  <Text style={styles.defectTotal}>{severity.total_defects}</Text>
                </View>

                <View style={styles.defectStatsGrid}>
                  {/* Render status breakdown dynamically */}
                  {Object.values(severity.status_breakdown).map((status) => (
                    <View style={styles.statItem} key={status.status_id}>
                      <View
                        style={[
                          styles.dot,
                          { backgroundColor: status.status_color },
                        ]}
                      />
                      <Text
                        style={styles.statText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {status.status_name.toUpperCase()}
                      </Text>
                      <Text style={styles.statValue}>{status.count}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.viewChartButton,
                      {
                        backgroundColor: severityColor + '20',
                        borderColor: severityColor,
                      },
                    ]}
                    onPress={() => handleViewChart(severity)}
                  >
                    <Text style={[styles.viewChartText, { color: severityColor }]}>
                      View Chart
                    </Text>
                  </TouchableOpacity>
                </View>
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
                {selectedSeverity?.severity_name} Chart
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            {selectedSeverity && renderPieChart(selectedSeverity)}
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
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    padding: 40,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#1a2a5c',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
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
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 8,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 90,
  },
  viewChartText: {
    fontSize: 12,
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
