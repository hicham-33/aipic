export enum AppStage {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  PREVIEW = 'PREVIEW',
  LOCKED = 'LOCKED'
}

export interface ProcessingStep {
  label: string;
  progress: number;
}