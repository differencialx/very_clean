module Api
  module V1
    module Projects::Operation
      class Create < Trailblazer::Operation
        step Model(Project, :new)
        step Policy::Pundit(ProjectPolicy, :create?)
        step Contract::Build(constant: Projects::Contract::Create)
        step :set_user
        step Contract::Validate(), fail_fast: true
        step Contract::Persist()
        step Projects::Operation::RendererOptions

        def set_user(options, current_user:, **)
          options[:model].user = current_user
        end
      end
    end
  end
end
