module Api
  module V1
    module Comments::Operation
      class Create < Trailblazer::Operation
        step Model(Comment, :new)
        step Contract::Build(constant: Comments::Contract::Create)
        step :set_task
        step Policy::Pundit(CommentPolicy, :create?)
        step Contract::Validate(), fail_fast: true
        step :set_attrs
        step :save
        step Comments::Operation::RendererOptions

        def set_task(options, params:, **)
          options[:model].task_id = params[:task_id]
        end

        def set_attrs(options, params:, **)
          options[:model].text = params[:text]
          options[:model].attachment.attach(params[:attachment].presence)
          true
        end

        def save(options, params:, **)
          # binding.pry
          options[:model].save
        end
      end
    end
  end
end
