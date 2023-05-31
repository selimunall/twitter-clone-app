export interface tweet {
  id: string;
  content: string;
  likedBy: string[];
  retweetBy: string[];
  commentedBy: string[];
  createdAt: string;
  by: {
    id: string;
    name: string;
    username: string;
    profileURL: string;
  };
  liked?: boolean;
  commented?: boolean;
}
