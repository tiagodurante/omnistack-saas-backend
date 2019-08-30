"use strict";

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use("App/Models/User");
const Role = use("Adonis/Acl/Role");
const Permission = use("Adonis/Acl/Permission");

class DatabaseSeeder {
  async run() {
    const user = await User.create({
      name: "Tiago Amado Durante",
      email: "tiagodurante@outlook.com.br",
      password: "123456"
    });
    const createInvites = await Permission.create({
      slug: "invites_create",
      name: "Convidar membros"
    });
    const createProjects = await Permission.create({
      slug: "projects_create",
      name: "Criar projetos"
    });
    const admin = await Role.create({
      slug: "administrator",
      name: "Administrador"
    });
    const moderador = await Role.create({
      slug: "Moderator",
      name: "Moderador"
    });
    const visitor = await Role.create({
      slug: "visitor",
      name: "Visitante"
    });
    await admin.permissions().attach([createInvites.id, createProjects.id]);
    await moderador.permissions().attach([createProjects.id]);
    const team = await user.teams().create({
      name: "Rocketseat",
      user_id: user.id
    });
    const teamJoin = await user
      .teamJoins()
      .where("team_id", team.id)
      .first();

    await teamJoin.roles().attach([admin.id]);
  }
}

module.exports = DatabaseSeeder;
