"use strict";

/**
 * Resourceful controller for interacting with teams
 */
class TeamController {
  async index({ auth }) {
    const teams = auth.user.teams().fetch();
    return teams;
  }

  async store({ request, auth }) {
    const data = request.only(["name"]);

    const team = await auth.user.teams().create({
      ...data,
      user_id: auth.user.id
    });

    return team;
  }

  async show({ params, auth }) {
    const team = await auth.user
      .teams()
      .where("teams.id", params.id)
      .first();

    return team;
  }

  async update({ params, request, auth }) {
    const data = request.only(["name"]);
    const team = await auth.user
      .teams()
      .where("teams.id", params.id)
      .first();

    team.merge(data);
    team.save();

    return team;
  }

  async destroy({ params, auth }) {
    const team = await auth.user
      .teams()
      .where("teams.id", params.id)
      .first();

    await team.delete();
  }
}

module.exports = TeamController;
