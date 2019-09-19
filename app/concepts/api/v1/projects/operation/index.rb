module Api
  module V1
    module Projects::Operation
      class Index < Trailblazer::Operation
        step :fetch_collection!
        step Policy::Pundit(ProjectPolicy, :index?)
        step Projects::Operation::RendererOptions

        def fetch_collection!(options, current_user:, **)
          options[:model] = current_user.projects
        end
      end
    end
  end
end
