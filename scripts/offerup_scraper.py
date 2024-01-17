import json
import sys
from pyOfferUp import fetch


def search_offers(keyword):
    posts = fetch.get_listings(
        query=keyword, state="California", city="San Diego", limit=10)
    output_data = []

    for post in posts:
        output_data.append({
            'item': post['title'],
            'price': post['price'],
            'location': post['locationName'],
            'link': post['listingUrl'],
            'market': 'offerup',
        })

    output_data.sort(key=lambda x: float(x['price']))
    return output_data


def main():
    if len(sys.argv) > 1:
        keyword = sys.argv[1]
        data = search_offers(keyword)
        print(json.dumps(data))  # Print the output as JSON


if __name__ == "__main__":
    main()
