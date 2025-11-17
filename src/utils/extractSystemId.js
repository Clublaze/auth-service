export const extractSystemId = (email) =>{
    if(!email) return null;

    const prefix = email.split("@")[0];
    const systemId = prefix.split(".")[0];

    if(!/^\d+$/.test(systemId)) return null;

    return systemId;
}