// Simple test to verify the API integration
const API_BASE = 'http://192.168.1.49:3000';

async function testDefectDistributionAPI() {
  try {
    console.log('Testing Defect Distribution API...');
    
    const response = await fetch(`${API_BASE}/api/defect-distribution-by-type/1`);
    const data = await response.json();
    
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('✅ API call successful!');
      console.log(`Total valid defects: ${data.data.total_valid_defects}`);
      console.log(`Number of defect types: ${data.data.defect_types.length}`);
      
      data.data.defect_types.forEach((type, index) => {
        console.log(`${index + 1}. ${type.defect_type_name}: ${type.valid_defects} defects (${type.percentage}%)`);
      });
    } else {
      console.log('❌ API call failed:', data.message);
    }
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

// Run the test
testDefectDistributionAPI();
