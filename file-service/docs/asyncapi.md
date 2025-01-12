# File Service API 1.0.0 documentation

API for file-related operations, including S3 interaction, uploading, retrieving, removing images

## Table of Contents

* [Operations](#operations)
  * [RECEIVE upload_profile_image](#receive-upload_profile_image-operation)
  * [REPLY get_profile_image](#reply-get_profile_image-operation)
  * [RECEIVE remove_profile_image](#receive-remove_profile_image-operation)

## Operations

### RECEIVE `upload_profile_image` Operation

* Operation ID: `upload_profile_image`

#### Message `Upload profile image.`

*Uploads profile image to S3.*

* Message ID: `subscribe.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| filename | string | Original file name. | - | - | - |
| fileBuffer | object | File buffer. | - | - | **additional properties are allowed** |
| owner_id | string | ID of image-owner. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "filename": "string",
  "fileBuffer": {},
  "owner_id": "string"
}
```



### REPLY `get_profile_image` Operation

* Operation ID: `get_profile_image`

#### Message `Retrieve profile image url.`

*Retrieving profile image url from S3.*

* Message ID: `subscribe.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| owner_id | string | ID of image-owner. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "owner_id": "string"
}
```


#### Response information

* reply should be done to channel: `get_profile_image`
#### Message `Replying profile image url.`

*Replying with profile image url from S3.*

* Message ID: `reply.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| signed_url | string | Signed url of user image. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "signed_url": "string"
}
```




### RECEIVE `remove_profile_image` Operation

* Operation ID: `remove_profile_image`

#### Message `Delete profile image.`

*Deletes profile image from S3.*

* Message ID: `subscribe.message`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| owner_id | string | ID of image-owner. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "owner_id": "string"
}
```



