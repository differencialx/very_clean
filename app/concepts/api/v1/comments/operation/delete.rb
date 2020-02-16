module Api
  module V1
    module Comments::Operation
      class Delete < Trailblazer::Operation
        step Model(Comment, :find_by)
        step Policy::Pundit(CommentPolicy, :destroy?)
        step :destroy!

        def destroy!(options, **)
          options[:model].destroy
        end
      end
    end
  end
end
