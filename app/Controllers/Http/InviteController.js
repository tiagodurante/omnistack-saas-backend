"use strict";

class InviteController {
  async store({ request, auth }) {
    console.log(request.team);
  }
}

module.exports = InviteController;
