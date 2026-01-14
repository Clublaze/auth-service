kafka -
    to make kafka topics when in production 
    Dev: auto-create is OK

    Prod: topic created by infra (Terraform / AWS MSK)

Redis for refresh tokens (advanced)
Permission storage model (permission.model.js)

storing raw tokens in DB, have to fix it later, talking about refreshToken.model.js file.


when i will add /logout, /refresh, /me, you’ll use authenticate middleware there.