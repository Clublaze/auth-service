in production use these for mongo and kafka - 
    MongoDB → Atlas
    Kafka → Managed (MSK / Confluent)

Redis for refresh tokens (advanced)
Permission storage model (permission.model.js)

storing raw tokens in DB, have to fix it later, talking about refreshToken.model.js file.


when i will add /logout, /refresh, /me, you’ll use authenticate middleware there.

we can do like during signup we can make users choose some clubs and then emit those clubs data through kafka and then lcub service can consume that data and automatically add that user to that club


in auth-service we also have to do like university roles and global roles seperate, global roles like, (student faculty, admin, super admin) and university roles like (HOD, DEAN) for better SAAS, because if we will scale this platform to other universities then this is important.