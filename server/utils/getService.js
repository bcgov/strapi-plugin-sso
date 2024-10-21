// Copied over from @strapi/admin files
const getService = (name) => {
    return strapi.service(`admin::${name}`);
};
module.exports = { getService };