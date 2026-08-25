import {
  createSocialPreview,
  socialImageAlt,
  socialImageSize,
} from "@/lib/social-preview"

export const alt = socialImageAlt
export const size = socialImageSize
export const contentType = "image/png"

export default function TwitterImage() {
  return createSocialPreview()
}
