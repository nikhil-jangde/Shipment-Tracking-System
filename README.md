# Shipment Tracking System API Documentation

## Introduction
Welcome to the Shipment Tracking System API documentation. This guide provides details on how to interact with the user and shipment APIs using Postman.

## Start Script
 C:\Users\nikhil\Shipment-Tracking-System> npm start

# Base URL
<img src='https://nikhil-jangde.github.io/githost/base-url.png'>

## User APIs

This api's are related to user related operations e.g. (register user , login user , delete user , update user , verify jwt token)

Use this "Admin-User" Credentials for user related operations ---->

{
    "username":"username@admin",
    "password":"admin@1234",
    "role":"admin"
}

## 1. Register User.
   
--> Endpoint.
<img src='https://nikhil-jangde.github.io/githost/create-user-endpoint.png'>

--> Request Body.
<img src='https://nikhil-jangde.github.io/githost/register-user-body.png'>

## 2. Login User.
   
--> Endpoint.
<img src='https://nikhil-jangde.github.io/githost/user-login-endpoint.png'>

--> Request Body.
<img src='https://nikhil-jangde.github.io/githost/user-login-body.png'>

## 3. Remove User.
   
--> Endpoint.
<img src='https://nikhil-jangde.github.io/githost/remove-user-endpoint.png'>

--> Request Body.
<img src='https://nikhil-jangde.github.io/githost/remove-user-body.png'>

## 4. Update User.

--> Endpoint.
<img src='https://nikhil-jangde.github.io/githost/update-user-endpoint.png'>

--> Request Body.
<img src='https://nikhil-jangde.github.io/githost/update-user-body.png'>

## 5. Verify Token.
   
--> Endpoint.
<img src='https://nikhil-jangde.github.io/githost/verify-token-endpoint.png'>

--> Request Body.
<img src='https://nikhil-jangde.github.io/githost/verify-token-body.png'>

## Shipment APIs
This api's are related to Shipments related operations e.g. (create new shipment , update shipment status , update shipment current status )

## 1. Fetch All Shipments

   --> Endpoint
   <img src='https://nikhil-jangde.github.io/githost/get-shipment-endpoint.png'>

## 2. Add Shipment

   --> Endpoint
   <img src='https://nikhil-jangde.github.io/githost/add-shipment-endpoint.png'>
   
   --> Request Body
    <img src='https://nikhil-jangde.github.io/githost/add-shipment-body.png'>
    
## 3. Update Shipment Status

   --> Endpoint
    <img src='https://nikhil-jangde.github.io/githost/location-status-update-endpoint.png'>
    
   --> Request Body
    <img src='https://nikhil-jangde.github.io/githost/location-status-updates-body.png'>
    
## 4. Update Shipment Current Status

   --> Endpoint
    <img src='https://nikhil-jangde.github.io/githost/current-status-update-endpoint.png'>
    
   --> Request Body
    <img src='https://nikhil-jangde.github.io/githost/current-statue-update-body.png'>

## 4.Shipment Search / Filter Api

   --> Endpoint
    <img src='https://nikhil-jangde.github.io/githost/search-user-endpoint.png'>
    
   --> Request Body
    <img src='https://nikhil-jangde.github.io/githost/search-user-body.png'>

   --> Response
    <img src='https://nikhil-jangde.github.io/githost/search-user-response.png'>

## User-log-APIs

This api's are related to user-logs related operations.

## 1. Get All Users Logs

   --> Endpoint
    <img src='https://nikhil-jangde.github.io/githost/users-logs-endpoint.png'>

## 2. Get Specific Users Logs by userId

  --> Endpoint
 <img src='https://nikhil-jangde.github.io/githost/user-logsbyid-endpoint.png'>

 ## Shipment-log-APIs

This api's are related to Shipment-logs related operations.

## 1. Get All Shipments Logs

   --> Endpoint
    <img src='https://nikhil-jangde.github.io/githost/all-shipmenr-logs.png'>

## 2. Get Specific Shipments Logs by trackingNumber

  --> Endpoint
 <img src='https://nikhil-jangde.github.io/githost/shipment-logsbyid-endpoint.png'>

 # Conclusion
 
This concludes the Shipment Tracking System API documentation. If you have any questions or issues, please feel free to contact me at nikhiljangde123@gmail.com

