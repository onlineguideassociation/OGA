import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();

const REGION = process.env.AWS_REGION || "ap-southeast-1";
const BUCKET = process.env.AWS_S3_BUCKET || "";

const s3 = new S3Client({ region: REGION });
const ses = new SESClient({ region: REGION });

export async function uploadToS3({ key, body, contentType = "application/octet-stream" }) {
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
  return { bucket: BUCKET, key, url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}` };
}

export async function getPresignedUrl(key, expiresIn = 3600) {
  const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(s3, cmd, { expiresIn });
}

export async function deleteFromS3(key) {
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  return { deleted: key };
}

export async function sendEmail({ to, subject, htmlBody, textBody, from }) {
  const source = from || process.env.SES_FROM_EMAIL || "noreply@onlineguideassociation.org";
  const cmd = new SendEmailCommand({
    Source: source,
    Destination: { ToAddresses: Array.isArray(to) ? to : [to] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: {
        Html: { Data: htmlBody, Charset: "UTF-8" },
        Text: { Data: textBody || htmlBody.replace(/<[^>]+>/g, ""), Charset: "UTF-8" },
      },
    },
  });
  const result = await ses.send(cmd);
  return { messageId: result.MessageId };
}
