## Instruction

### For locally run the project

- command: git clone https://github.com/Antor7080/assignment-2/
- command: npm install
- command: npm run dev

### 1.For creating user :

- Method : post
- Endpoint : http://assignment.fooddoose.com/api/users/
- Request Body :

```ts
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}
```

### 2. Retrieve a list of all users

- Method : get
- Endpoint : http://assignment.fooddoose.com/api/users/

### 3. Retrieve a specific user by ID

- Method : get
- Endpoint : http://assignment.fooddoose.com/api/users/:userId

### 4. Update user information

- Method : put
- Endpoint : http://assignment.fooddoose.com/api/users/:userId
- Request Body:

```json
{
  "userId": 123,
  "username": "example_username",
  "password": "example_password",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "age": 25,
  "email": "john.doe@example.com",
  "isActive": true,
  "hobbies": ["reading", "traveling"],
  "address": {
    "street": "123 Main Street",
    "city": "Example City",
    "country": "Example Country"
  }
}
```

### 5. Delete a user

- Method : delete
- Endpoint : http://assignment.fooddoose.com/api/users/:userId
- Response :

```json
{
  "success": true,
  "message": "User deleted successfully!",
  "data": null
}
```

### 6. Add New Product in Order

- Method : put
- Endpoint : http://assignment.fooddoose.com/api/users/:userId/orders
- Request Body:

```json
{
  "productName": "string",
  "price": "number",
  "quantity": "number"
}
```

### 7. Retrieve all orders for a specific user

- Method : get
- Endpoint : http://assignment.fooddoose.com/api/users/:userId/orders
- Response :

```json
{
  "success": true,
  "messag": "Order fetched successfully!",
  "data": [
    {
      "productName": "test",
      "price": 12,
      "quantity": 120,
      "_id": "65621e9ebda56d3bf0b8e72c"
    },
    {
      "productName": "test",
      "price": 12,
      "quantity": 120,
      "_id": "65621ea4bda56d3bf0b8e731"
    },
    {
      "productName": "test",
      "price": 12,
      "quantity": 120,
      "_id": "65621ea6bda56d3bf0b8e738"
    }
  ]
}
```

### 8. Calculate Total Price of Orders for a Specific User

- Method : get
- Endpoint : http://assignment.fooddoose.com/api/users/:userId/orders/total-price
- Response :

```json
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": [
    {
      "totalPrice": 4320
    }
  ]
}
```
