'use strict';

//Enable all roles by default
async function enableRoles(strapi){
  const roleService = strapi.plugin('strapi-plugin-sso').service('role');

  //Check enabled roles haven't already been set
  const keycloakRoles = await roleService.keycloakRoles();
  if(!keycloakRoles){
  
    console.log(" - Enabling all roles for Keycloak");
    const adminRoleService = strapi.admin.services.role;
    const adminRoles = await adminRoleService.find();
    
    await roleService.update([
      {
        'oauth_type': 1,
        role: adminRoles.map(r => r.id),
      }])
  }
}

module.exports = async ({ strapi }) => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Read',
      uid: 'read',
      pluginName: 'strapi-plugin-sso',
    },
  ];
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
  await enableRoles(strapi);
};
