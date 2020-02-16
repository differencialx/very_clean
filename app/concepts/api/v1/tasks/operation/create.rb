module Api
  module V1
    module Tasks::Operation
      class Create < Trailblazer::Operation
        step Model(Task, :new)
        step Contract::Build(constant: Tasks::Contract::Create)
        step :set_project
        step Policy::Pundit(TaskPolicy, :create?)
        step Contract::Validate(), fail_fast: true
        step Contract::Persist()
        step Tasks::Operation::RendererOptions

        def set_project(options, params:, **)
          options[:model].project_id = params[:project_id]
        end
      end
    end
  end
end
