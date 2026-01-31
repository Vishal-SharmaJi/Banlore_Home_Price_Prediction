x= open("D:\Banlore_Home_Price_Prediction\Client\property.txt","w")
x.write("Images/OIP.jpg")
x= open("D:\Banlore_Home_Price_Prediction\Client\property.txt","a")
for i in range(1,36):
    x.write(f"Images/OIP ({i}).jpg,")