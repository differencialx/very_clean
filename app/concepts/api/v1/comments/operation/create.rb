module Api
  module V1
    module Comments::Operation
      class Create < Trailblazer::Operation
        step Model(Comment, :new)
        step Contract::Build(constant: Comments::Contract::Create)
        step :set_task
        step Policy::Pundit(CommentPolicy, :create?)
        step Contract::Validate(), fail_fast: true
        step Contract::Persist()
        step Comments::Operation::RendererOptions

        def set_task(options, params:, **)
          options[:model].task_id = params[:task_id]
        end
      end
    end
  end
end
