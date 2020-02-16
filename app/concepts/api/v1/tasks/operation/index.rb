module Api
  module V1
    module Tasks::Operation
      class Index < Trailblazer::Operation
        step :fetch_project!
        step Policy::Pundit(TaskPolicy, :index?)
        step :fetch_collection!
        step Tasks::Operation::RendererOptions

        def fetch_project!(options, params:, **)
          options[:model] = Project.find_by(id: params[:project_id])
        end

        def fetch_collection!(options, current_user:, **)
          options[:model] = options[:model].tasks
        end
      end
    end
  end
end
