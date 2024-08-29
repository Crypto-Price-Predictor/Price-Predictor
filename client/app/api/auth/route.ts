import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID, // Your client ID
  process.env.GMAIL_CLIENT_SECRET, // Your client secret
  'http://localhost:3000/api/auth/callback' // Your redirect URI
);

// Generate a URL for user consent
export function getAuthUrl() {
  const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
}

export async function GET() {
  const authUrl = getAuthUrl();
  return NextResponse.redirect(authUrl);
}
