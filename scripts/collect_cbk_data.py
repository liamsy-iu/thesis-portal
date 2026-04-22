"""
Scraper for CBK Financial Inclusion Data
Extracts data from CBK FinAccess surveys and reports.
"""
import httpx
import re
from pathlib import Path
from db import insert_data_source, execute_query

DATA_DIR = Path(__file__).parent / "data" / "cbk"
DATA_DIR.mkdir(parents=True, exist_ok=True)

# CBK FinAccess survey URLs (update with actual URLs)
FINACCESS_URLS = {
    2024: "https://www.centralbank.go.ke/wp-content/uploads/2024/12/2024-FINACCESS-HOUSEHOLD-SURVEY-MAIN-REPORT.pdf",
}

def download_report(year, url):
    """Download FinAccess report."""
    filepath = DATA_DIR / f"finaccess_{year}.pdf"
    if filepath.exists():
        print(f"  ✓ {year} already downloaded")
        return filepath
    
    print(f"  Downloading {year}...")
    try:
        with httpx.Client(timeout=60) as client:
            response = client.get(url, follow_redirects=True)
            response.raise_for_status()
            filepath.write_bytes(response.content)
            print(f"  ✓ Saved to {filepath}")
            return filepath
    except Exception as e:
        print(f"  ✗ Failed: {e}")
        return None

def extract_financial_inclusion(filepath, year):
    """Extract financial inclusion metrics (template)."""
    # This is a placeholder — adjust based on actual report structure
    return {
        'year': year,
        'region': 'National',
        'banked_percentage': None,  # Extract from PDF
        'mobile_money_percentage': None,
        'formally_included_percentage': None,
    }

def main():
    """Main workflow for CBK data."""
    print("CBK FinAccess Data Collection")
    print("=" * 50)
    
    for year, url in FINACCESS_URLS.items():
        print(f"\n{year}:")
        filepath = download_report(year, url)
        if filepath:
            source_id = insert_data_source(
                name=f"CBK FinAccess Survey {year}",
                source_type="cbk_report",
                url=url,
                file_path=str(filepath)
            )
            print(f"  ✓ Registered as source #{source_id}")

if __name__ == "__main__":
    main()