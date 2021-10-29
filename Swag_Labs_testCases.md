# Test Cases:

### Login User Test Cases
----
- Swag_Labs_Login_N0
> This is a negative test case to validate if the login doesn't works with invalid user credentials.

Steps | Action | Expected Result | Notes | Result |
----- | ------ | --------------- | ------| ------ | 
1 | Basic auth: <ul><li>Invalid User</li></ul>Input data: <ul><li>{User: random_User_Name} </li></ul> POST -/Login| Status Code: 401| - ||

- Swag_Labs_Login_P0
> This is a positive test case to validate if the login works with valid user credentials.

Steps | Action | Expected Result | Notes | Result |
----- | ------ | --------------- | ------| ------ | 
1 | Basic auth: <ul><li>Valid User</li></ul>Input data: <ul><li>User: standard_user \|\| locked_out_user \|\| problem_user \|\| performance_glitch_user</li><li>Password: secret_sauce</li></ul>POST -/Login| Status Code: 200| - ||

### Logout User Test Cases
----
- Swag_Labs_LogOut_P0
> This is a positive test case to validate if the user can logout and gets redirect to the LoginPage.

Steps | Action | Expected Result | Notes | Result |
----- | ------ | --------------- | ------| ------ | 
1 | Basic auth: <ul><li>Valid User</li></ul>Input data: <ul><li>User: standard_user \|\| locked_out_user \|\| problem_user \|\| performance_glitch_user</li><li>Password: secret_sauce</li></ul>POST -/Login| Status Code: 200| - ||
2 | Input data: <ul><li>Token: {UserToken} </li></ul>POST -/LogOut| Status Code: 200| - ||
3 | Redirects to "LoginPage" | Status Code: 200| - ||

### Products User Test Cases
----
- Swag_Labs_Products_P0
> This is a positive test case to validate if the products can be ordered by low to high Price.

Steps | Action | Expected Result | Notes | Result |
----- | ------ | --------------- | ------| ------ | 
1 | Basic auth: <ul><li>Valid User</li></ul>Input data: <ul><li>User: standard_user \|\| locked_out_user \|\| problem_user \|\| performance_glitch_user</li><li>Password: secret_sauce</li></ul>POST -/Login| Status Code: 200| - ||
2 | Input data: <ul><li>Token: {User_Token} </li><li>Filter: Price_Low_To_High </li></ul>POST -/inventory/filter| Status Code: 200| Verify that the lower prices are the first elements ||

### Shopping Car Test Cases
----

- Swag_Labs_ShoppingCart_P0
> This is a positive test case to validate that the items could be added to the shopping cart.

Steps | Action | Expected Result | Notes | Result |
----- | ------ | --------------- | ------| ------ | 
1 | Basic auth: <ul><li>Valid User</li></ul>Input data: <ul><li>User: standard_user \|\| locked_out_user \|\| problem_user \|\| performance_glitch_user</li><li>Password: secret_sauce</li></ul>POST -/Login| Status Code: 200| - ||
2 | Input data: <ul><li>Token: {User_Token} </li><li>Item: {addRandomItem} </li></ul>PUT -/inventory/shoppingCar| Status Code: 200| Verify that the shoping cart add an item ||



- Swag_Labs_ShoppingCart_p1
> This is a positive test case to validate that the added items from the list are added to shopping cart.

Steps | Action | Expected Result | Notes | Result |
----- | ------ | --------------- | ------| ------ | 
1 | Basic auth: <ul><li>Valid User</li></ul>Input data: <ul><li>User: standard_user \|\| locked_out_user \|\| problem_user \|\| performance_glitch_user</li><li>Password: secret_sauce</li></ul>POST -/Login| Status Code: 200| - ||
2 | Input data: <ul><li>Token: {User_Token} </li><li>Item: ‘Sauce Labs Onesie’ </li></ul>PUT -/inventory/shoppingCar| Status Code: 200|  ||
3 | Input data: <ul><li>Token: {User_Token} </li></ul>GET -/inventory/shoppingCar| Status Code: 200| Verify that the product ‘Sauce Labs Onesie’ has been added to the list ||

- Swag_Labs_ShoppingCart_p1
> This is a positive test case to validate that the added items from the list are added to shopping cart.

Steps | Action | Expected Result | Notes | Result |
----- | ------ | --------------- | ------| ------ | 
1 | Basic auth: <ul><li>Valid User</li></ul>Input data: <ul><li>User: standard_user \|\| locked_out_user \|\| problem_user \|\| performance_glitch_user</li><li>Password: secret_sauce</li></ul>POST -/Login| Status Code: 200| - ||
2 | Input data: <ul><li>Token: {User_Token} </li><li>Item: {Random_Item} </li></ul>PUT -/inventory/shoppingCar| Status Code: 200|  ||
3 | Input data: <ul><li>Token: {User_Token} </li></ul>GET -/inventory/shoppingCar| Status Code: 200|  ||
4 | Input data: <ul><li>Token: {User_Token} </li></ul>GET -/inventory/purchase | Status Code: 200|  ||
5 | User checkouts and gets redirect to "checkout-step-one"| |  ||
6 | Input data: <ul><li>Token: {User_Token} </li><li>First Name: {Random_FirstName} </li><li>Last Name: {Random_LastName} </li><li>ZIP Code: {Random_ZipCode} </li></ul>POST -/inventory/userInformation| Status Code: 200|  ||
7 | User is redirected to "checkout-step-two" | |  ||
8 | Input data: <ul><li>Token: {User_Token} </ul>POST -/inventory/createOrder| Status Code: 200|  ||
9 | User is redirected to "checkout-complete" | |  ||