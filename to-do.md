in production use these for mongo and kafka - 
    MongoDB → Atlas
    Kafka → Managed (MSK / Confluent)

Redis for refresh tokens (advanced)
Permission storage model (permission.model.js)

storing raw tokens in DB, have to fix it later, talking about refreshToken.model.js file.


when i will add /logout, /refresh, /me, you’ll use authenticate middleware there.