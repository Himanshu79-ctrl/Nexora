import { useCallback } from 'react'
import { useInterview as useCtx } from '../context/InterviewContext'
import { createInterview, submitAnswer, endInterview } from '../api/interviewApi'
import { useWebSocket } from './useWebSocket'
import { useSpeechSynthesis } from './useSpeechSynthesis'
import toast from 'react-hot-toast'

export const useInterview = () => {
  const ctx = useCtx()
  const { connected, lastMessage, send } = useWebSocket(ctx.interview?.id)
  const { speakText, isSpeaking } = useSpeechSynthesis()

  const startInterview = useCallback(async (config) => {
    try {
      const { data } = await createInterview(config)
      ctx.setInterview(data)
      ctx.setStatus('active')
      ctx.setCQ(data.first_question)
      await speakText(data.first_question.text)
    } catch (err) {
      toast.error('Failed to start interview')
      throw err
    }
  }, [ctx, speakText])

  const submitUserAnswer = useCallback(async (answerText) => {
    if (!ctx.interview) return
    ctx.addTranscriptEntry('user', answerText)
    try {
      const { data } = await submitAnswer(ctx.interview.id, {
        question_id: ctx.currentQuestion?.id,
        answer: answerText,
      })
      ctx.setFeedback(data.feedback)
      ctx.addTranscriptEntry('ai', data.next_question?.text || 'Interview complete.')
      if (data.next_question) {
        ctx.setCQ(data.next_question)
        ctx.setQIndex(i => i + 1)
        await speakText(data.next_question.text)
      } else {
        ctx.setStatus('ended')
      }
    } catch {
      toast.error('Failed to submit answer')
    }
  }, [ctx, speakText])

  const finish = useCallback(async () => {
    if (!ctx.interview) return
    await endInterview(ctx.interview.id)
    ctx.setStatus('ended')
  }, [ctx])

  return {
    ...ctx,
    connected,
    isSpeaking,
    startInterview,
    submitUserAnswer,
    finish,
  }
}