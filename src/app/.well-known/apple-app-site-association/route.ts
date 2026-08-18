import { NextResponse } from 'next/server';

// apple-app-site-association — served at /.well-known/apple-app-site-association
// iOS Universal Links: lets the OS open bptrack.app links directly in the BP Central app.
//
// ACTION REQUIRED before App Store submission:
//   Replace APPLE_TEAM_ID with your 10-character Apple Developer Team ID.
//   Find it at: developer.apple.com > Account > Membership > Team ID
//
// The bundle identifier is confirmed from the app's Expo config: com.anvilroad.bptrack.
// The Team ID is NOT confirmed. It lives in the Apple Developer account and was
// not available to this milestone, so it is left as a placeholder rather than
// guessed. Universal Links will not work until it is filled in.
const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID || 'APPLE_TEAM_ID';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: `${APPLE_TEAM_ID}.com.anvilroad.bptrack`,
          paths: ['*'],
        },
      ],
    },
  });
}
