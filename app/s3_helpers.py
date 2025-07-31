import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("AWS_S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
   aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
)


def allowed_file(filename):
    if not filename:
        return False
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    if not filename or '.' not in filename:
        return None
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    try:
        if not BUCKET_NAME:
            return {"errors": "S3 bucket not configured"}

        # Get content type, default to application/octet-stream if not available
        content_type = getattr(file, 'content_type', 'application/octet-stream')

        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": content_type
            }
        )

    except Exception as e:
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}
