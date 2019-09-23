module Api
  module V1
    class CommentsController < ApiController
      before_action :authorize_by_access_cookie!

      def create
        endpoint operation: Comments::Operation::Create,
                 options: { current_user: current_user }
      end

      def destroy
        endpoint operation: Comments::Operation::Delete,
                 options: { current_user: current_user }
      end
    end
  end
end
