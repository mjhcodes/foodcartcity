import requests, string, json, csv

headers = {
  "user-key": "845100fc86ee9f8dacc60cda5d0c1d7b"
}

foodcarts_api_data = requests.get('https://developers.zomato.com/api/v2.1/search?entity_id=286&entity_type=city&start=0&establishment_type=81', headers=headers)

foodcarts_json = foodcarts_api_data.json()

foodcarts_csv = open('/Users/mattbookair/Desktop/foodcarts.csv', 'w')
csvwriter = csv.writer(foodcarts_csv)

fcc_restaurants = foodcarts_json['restaurants']

fcc = {}
for i in range(20):
  cart = fcc_restaurants[i]['restaurant']
  fcc.update(cart)

  count = 0
  if count == 0:
    csvwriter.writerow(fcc.keys())
    count += 1
    csvwriter.writerow(fcc.values())

foodcarts_csv.close()

















# def get_names():
#   foodcart_names = []
#   for i in range(20):
#     foodcarts = (foodcarts_json['restaurants'][i]['restaurant'])
#     foodcart_names.append(foodcarts.get("name"))
#   return foodcart_names

# def get_numbers():
#   foodcart_numbers = []
#   for i in range(20):
#     foodcarts = (foodcarts_json['restaurants'][i]['restaurant'])
#     foodcart_numbers.append(foodcarts.get("phone_numbers"))
#   return foodcart_numbers

# def write_to_csv():
#   foodcarts_csv = open('/Users/mattbookair/Desktop/foodcarts.csv', 'w')
#   csvwriter = csv.writer(foodcarts_csv)
#   foodcart_names = get_names()
#   foodcart_numbers = get_numbers()
#   count = 0
#   for name in foodcart_names:
#     if count == 0:
#       csvwriter.writerow(["name"])
#       count += 1
#     csvwriter.writerow([name])
#   count = 0
#   for number in foodcart_numbers:
#     if count == 0:
#       csvwriter.writerow(["phone"])
#       count += 1
#     csvwriter.writerow([number])
#   foodcarts_csv.close()

# write_to_csv()