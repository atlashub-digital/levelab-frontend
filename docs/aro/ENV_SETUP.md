# ARO configuration (no values in git)
ARO_API_URL=https://aro-preview.atlashub.si
ARO_PROJECT_SLUG=levelab
ARO_PUBLIC_KEY=
ARO_SERVER_KEY=
ARO_WEBHOOK_SECRET=
ARO_CHECKOUT_ENABLED=false

Set in approved environment secrets management. Never commit server/public keys
or provider credentials. For mock tests use a local ARO OpenAPI-compatible
fixture server, not a payment-provider mock. Check configuration through ARO
operator/catalog onboarding before enabling any public checkout.
