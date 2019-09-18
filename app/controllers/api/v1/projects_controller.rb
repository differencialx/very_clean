module Api
  module V1
    class ProjectsController < ApiController
      before_action :authorize_by_access_cookie!

      def create
        endpoint operation: Projects::Operation::Create,
                 options: { current_user: current_user }
      end
    end
  end
end
