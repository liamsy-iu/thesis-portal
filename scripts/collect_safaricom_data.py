"""
Scraper for Safaricom Annual Reports
Downloads and extracts M-PESA metrics from PDF annual reports.
"""
import httpx
import pdfplumber
import re
from pathlib import Path
from db import insert_data_source, execute_query

DATA_DIR = Path(__file__).parent / "data" / "safaricom"
DATA_DIR.mkdir(parents=True, exist_ok=True)

# Known Safaricom annual report URLs (update as you find them)
REPORT_URLS = {
    2023: "https://www.safaricom.co.ke/images/Downloads/2023-Safaricom-Annual-Report.pdf",
}

def download_report(year, url):
    """Download annual report PDF."""
    filepath = DATA_DIR / f"safaricom_annual_report_{year}.pdf"
    if filepath.exists():
        print(f"  ✓ {year} report already downloaded")
        return filepath
    
    print(f"  Downloading {year} report...")
    try:
        with httpx.Client(timeout=60) as client:
            response = client.get(url, follow_redirects=True)
            response.raise_for_status()
            filepath.write_bytes(response.content)
            print(f"  ✓ Downloaded to {filepath}")
            return filepath
    except Exception as e:
        print(f"  ✗ Failed: {e}")
        return None

def extract_mpesa_metrics(filepath, year):
    """
    Extract M-PESA metrics from PDF.
    This is a template — you'll need to adjust based on actual PDF structure.
    """
    print(f"  Extracting data from {year} report...")
    
    with pdfplumber.open(filepath) as pdf:
        text = "\n".join(page.extract_text() or "" for page in pdf.pages)
    
    # Example regex patterns (adjust based on actual report format)
    patterns = {
        'active_users': r'active\s+(?:m-pesa\s+)?customers?[:\s]+([0-9,.]+)\s*(?:million|m)?',
        'transaction_volume': r'transactions?[:\s]+([0-9,.]+)\s*(?:billion|million|m)?',
        'agents': r'agents?[:\s]+([0-9,.]+)',
    }
    
    extracted = {'year': year}
    
    for key, pattern in patterns.items():
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            value = match.group(1).replace(',', '').replace('.', '')
            extracted[key] = int(value)
    
    return extracted

def store_metrics(data, source_id):
    """Store extracted metrics in database."""
    query = """
        INSERT INTO mpesa_metrics 
        (year, active_users_total, transaction_volume, agent_count, data_source_id)
        VALUES (%(year)s, %(active_users)s, %(transaction_volume)s, %(agents)s, %(source_id)s)
        ON CONFLICT (year, month) DO UPDATE SET
            active_users_total = EXCLUDED.active_users_total,
            transaction_volume = EXCLUDED.transaction_volume,
            agent_count = EXCLUDED.agent_count
    """
    data['source_id'] = source_id
    execute_query(query, data)
    print(f"  ✓ Stored metrics for {data['year']}")

def main():
    """Main data collection workflow."""
    print("Safaricom Annual Report Data Collection")
    print("=" * 50)
    
    for year, url in REPORT_URLS.items():
        print(f"\n{year}:")
        
        # Download
        filepath = download_report(year, url)
        if not filepath:
            continue
        
        # Register source
        source_id = insert_data_source(
            name=f"Safaricom Annual Report {year}",
            source_type="annual_report",
            url=url,
            file_path=str(filepath)
        )
        
        # Extract and store
        try:
            metrics = extract_mpesa_metrics(filepath, year)
            if metrics:
                store_metrics(metrics, source_id)
        except Exception as e:
            print(f"  ✗ Extraction failed: {e}")
    
    print("\n✓ Collection complete!")

if __name__ == "__main__":
    main()