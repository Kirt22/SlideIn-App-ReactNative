export interface thread {
  _id: string;
  inputPrompt: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  shortenedInputPrompt: string;
  __v: Int16Array;
}

export interface generatedResponse {
  tweakingParameters: {
    flirty: number;
    rude: number;
    cheezy: number;
    naughty: number;
  };
  generatedResponse: string;
  isVerfied: boolean;
  promptId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: Int16Array;
}

export interface generateResponseRequest {
  userPrompt: string;
  tweakingParameters: {
    flirty: number;
    rude: number;
    cheezy: number;
    naughty: number;
  };
}

export interface deteleThreadResponse {
  Thread: {
    acknowledged: boolean;
    deletedCount: number;
  };
  generatedResponse: {
    acknowledged: boolean;
    deletedCount: number;
  };
}
