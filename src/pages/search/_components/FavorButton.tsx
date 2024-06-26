import heart from "../../../assets/ico_heart.png";
import heartActive from "../../../assets/ico_heart_active.png";

import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { MutateFns } from "../../../lib/react-query/mutateFn";
import { useHandleError } from "../../hooks/use-handle-error";

import { ERROR_DETAILS } from "../../../api/constants/errorDetails";

import { cn } from "../../../lib/utils";

import { useAuth } from "@clerk/clerk-react";

import { toast } from "sonner";

type FavorButtonProps = {
  favorLength?: number;
  bookId: string;
  author: string;
  title: string;
  img: string;
  userId: string | null;
  isSubscribed: boolean | undefined;
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  className?: string;
  imgWidth?: number;
  imgHeight?: number;
};

type GetSubscriptionLengthResponse = {
  docsLength: number;
};

export default function FavorButton({
  favorLength,
  bookId,
  title,
  author,
  img,
  userId,
  isSubscribed,
  width,
  height,
  margin,
  className,
  padding,
  imgWidth,
  imgHeight,
}: FavorButtonProps) {
  const queryClient = getQueryClient();

  const { isSignedIn } = useAuth();

  const { mutate, error, isError } = useMutation({
    mutationFn: () =>
      MutateFns.PATCH_FAVOR_ITEM({
        userId,
        book: {
          bookId,
          author,
          title,
          img,
        },
      }),
    onSuccess: (response: FavorList | undefined) => {
      queryClient.setQueryData<FavorItem[]>(
        [QueryKeys.USER_FAVOR_LIST, userId],
        response?.books
      );

      queryClient.setQueryData<GetSubscriptionLengthResponse>(
        [QueryKeys.FAVOR_LENGTH, bookId],
        (prev: GetSubscriptionLengthResponse | undefined) => {
          if (prev) {
            return {
              ...prev,
              docsLength: prev.docsLength + 1,
            };
          } else {
            return prev;
          }
        }
      );
      queryClient.setQueryData(
        [QueryKeys.FAVOR_SUBSCRIPTION, bookId],
        !Boolean(isSubscribed)
      );
    },
  });

  useHandleError({
    error,
    isError,
    errorDetails: ERROR_DETAILS.PATCH_FAVOR_ITEM,
  });

  const onClick = () => {
    if (!isSignedIn) {
      toast.message("로그인 이후 이용하실 수 있습니다.");
      return;
    }

    console.log(isSignedIn);

    mutate();
  };

  return (
    <button
      className={cn("favor-btn", className && className)}
      onClick={onClick}
    >
      <div
        className="img-wrap"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          margin: `${margin}px`,
          padding: `${padding}px`,
        }}
      >
        <img
          src={isSubscribed ? heartActive : heart}
          alt="heart-icon"
          style={
            imgWidth && imgHeight
              ? { width: `${imgWidth}px`, height: `${imgHeight}px` }
              : {}
          }
        />
      </div>
      {favorLength && <span>{favorLength ?? 0}</span>}
    </button>
  );
}
