export type SocialPlatform =
  | "LINKEDIN"
  | "GITHUB"
  | "TWITTER"
  | "NAUKARI"
  | "OTHER";

export interface CreateSocialLinkInput {
  platform: SocialPlatform;
  url: string;
  displayOrder?: number;
  profileId: string;
}

export interface UpdateSocialLinkInput {
  platform?: SocialPlatform;
  url?: string;
  displayOrder?: number;
}