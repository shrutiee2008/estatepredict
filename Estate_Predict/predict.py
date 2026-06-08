import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from pickle import dump
from pickle import load

data=pd.read_csv("housing_dataset_in_crore.csv")

features=data[["Area (sqft)","Location","Bedrooms","Property_Type","Floor_No","Parking_Availability","Property_Age (Years)","Society_Features"]]
target=data["Price (Crore)"]

features=pd.get_dummies(features, drop_first=True)

x_train,x_test,y_train,y_test=train_test_split(features,target)

model=LinearRegression()
model.fit(x_train,y_train)


# Save
with open("house.pkl", "wb") as f:
    dump(model, f)

print("model saved")

# Load
with open("house.pkl", "rb") as f:
    model = load(f)

area = int(input("Enter Area (sqft): "))
location = input("Enter Location: ")
bedrooms = int(input("Enter Bedrooms: "))
property_type = input("Enter Property Type: ")
floor_no = int(input("Enter Floor No: "))
parking = input("Enter Parking Availability: ")
age = int(input("Enter Property Age (Years): "))
society = input("Enter Society Features: ")

new_house = pd.DataFrame({
    "Area (sqft)": [area],
    "Location": [location],
    "Bedrooms": [bedrooms],
    "Property_Type": [property_type],
    "Floor_No": [floor_no],
    "Parking_Availability": [parking],
    "Property_Age (Years)": [age],
    "Society_Features": [society]
})

new_house=pd.get_dummies(new_house,drop_first=True)
feature_columns=features.columns

new_house = new_house.reindex(columns=feature_columns, fill_value=0)

# Predict
predicted_price =model.predict(new_house)

print("Predicted Price (Crore):", predicted_price[0])
