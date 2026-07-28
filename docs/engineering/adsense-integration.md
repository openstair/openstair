---
title: AdSense Integration
description: Internal guide for configuring and using the OpenStair AdSense integration.
collection: engineering
order: 3
visibility: public
updatedAt: 2026-07-28
---

# AdSense Integration

OpenStair uses an isolated advertising module for Google AdSense preparation.

The integration is intentionally disabled by default. It loads the Google AdSense script only when ads are enabled, the publisher client is configured, and the application is running in production.

## Required Environment Variables

- `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT`
- `NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED`

`NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` should contain the Google AdSense publisher client value, such as `ca-pub-0000000000000000`. Do not commit a production publisher id to source files.

`NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED` must be set to `true` to allow ads to render in production.

## Enable Ads

To enable ads for production:

- Set `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT`.
- Set `NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED` to `true`.
- Deploy a production build.

Ads do not render when the client value is missing, when the enable flag is false, or when the app is not running in production.

## Ad Components

The reusable ad components are:

- `BannerAd`
- `InArticleAd`
- `MultiplexAd`

Each component accepts a `slotId` value from Google AdSense.

Use `slotId` for the AdSense ad unit slot id. Optional `className` and `style` props are available for local placement sizing when a page explicitly opts into an ad slot.

## Add A New Ad Slot

Create the ad unit in Google AdSense, copy the slot id, then place the appropriate component manually in the target page or layout using the `slotId` prop.

Do not place ads globally unless the page strategy has been reviewed.

## Current Scope

Auto Ads are not enabled.

No ad units are currently placed on website pages.

The root provider only prepares script loading for future manual ad placement.
