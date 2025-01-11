# Token Service API 1.0.0 documentation

API for user-related operations, including finding users, updating profiles, and updating images.

## Table of Contents

* [Operations](#operations)
  * [REPLY generate_tokens](#reply-generate_tokens-operation)
  * [REPLY verify_token](#reply-verify_token-operation)
  * [REPLY refresh_tokens](#reply-refresh_tokens-operation)
  * [RECEIVE blacklist_tokens](#receive-blacklist_tokens-operation)

## Operations

### REPLY `generate_tokens` Operation

* Operation ID: `generate_tokens`

Generating refresh and access tokens.

#### Message `Generate Tokens`

*Generates refresh and access tokens.*

* Message ID: `subscribe.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are NOT allowed** |
| id | string | User ID. | - | - | **required** |

> Examples of payload _(generated)_

```json
{
  "id": "string"
}
```


#### Response information

* reply should be done to channel: `generate_tokens`
#### Message `Generate Tokens Response`

*Returns generated tokens.*

* Message ID: `reply.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are NOT allowed** |
| access_token | string | Generated access token. | - | - | - |
| refresh_token | string | Generated refresh token. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```




### REPLY `verify_token` Operation

* Operation ID: `verify_token`

Verifying access token.

#### Message `Verify Access Token`

*Verify access token.*

* Message ID: `subscribe.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are NOT allowed** |
| access_token | string | Access token. | - | - | **required** |

> Examples of payload _(generated)_

```json
{
  "access_token": "string"
}
```


#### Response information

* reply should be done to channel: `verify_token`
#### Message `Verified Access Token`

*Verified access token.*

* Message ID: `reply.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| valid | boolean | Is token valid. | - | - | - |
| payload | object | - | - | - | **additional properties are allowed** |
| payload.id | string | User id from token. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "valid": true,
  "payload": {
    "id": "string"
  }
}
```




### REPLY `refresh_tokens` Operation

* Operation ID: `refresh_tokens`

Refreshing of access and refresh token.

#### Message `Refresh Tokens`

*Refreshes access and refresh tokens.*

* Message ID: `subscribe.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are NOT allowed** |
| refresh_token | string | Refresh token. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "refresh_token": "string"
}
```


#### Response information

* reply should be done to channel: `refresh_tokens`
#### Message `Refreshed Tokens`

*Refreshed access and refresh tokens.*

* Message ID: `reply.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| access_token | string | New access token. | - | - | - |
| refresh_token | string | New refresh token. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```




### RECEIVE `blacklist_tokens` Operation

* Operation ID: `blacklist_tokens`

Blacklisting of access and refresh token.

#### Message `Blacklist Tokens`

*Blacklist access and refresh tokens.*

* Message ID: `subscribe.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are NOT allowed** |
| refresh_token | string | Refresh token. | - | - | **required** |
| access_token | string | Access token. | - | - | **required** |

> Examples of payload _(generated)_

```json
{
  "refresh_token": "string",
  "access_token": "string"
}
```



