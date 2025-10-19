import type { PrismaModelSilk, PrismaEnumSilk } from "@gqloom/prisma";
import type { User as IUser, Post as IPost, Prisma } from "../prisma/client.ts";

export const User: PrismaModelSilk<IUser, "user", { posts: IPost[] }>;
export const Post: PrismaModelSilk<IPost, "post", { author?: IUser }>;

declare module "@gqloom/prisma" {
    interface PrismaTypes {
        User: {
            UserWhereInput: Prisma.UserWhereInput
            UserOrderByWithRelationInput: Prisma.UserOrderByWithRelationInput
            UserWhereUniqueInput: Prisma.UserWhereUniqueInput
            UserOrderByWithAggregationInput: Prisma.UserOrderByWithAggregationInput
            UserScalarWhereWithAggregatesInput: Prisma.UserScalarWhereWithAggregatesInput
            UserCreateInput: Prisma.UserCreateInput
            UserUncheckedCreateInput: Prisma.UserUncheckedCreateInput
            UserUpdateInput: Prisma.UserUpdateInput
            UserUncheckedUpdateInput: Prisma.UserUncheckedUpdateInput
            UserCreateManyInput: Prisma.UserCreateManyInput
            UserUpdateManyMutationInput: Prisma.UserUpdateManyMutationInput
            UserUncheckedUpdateManyInput: Prisma.UserUncheckedUpdateManyInput
            UserCountOrderByAggregateInput: Prisma.UserCountOrderByAggregateInput
            UserAvgOrderByAggregateInput: Prisma.UserAvgOrderByAggregateInput
            UserMaxOrderByAggregateInput: Prisma.UserMaxOrderByAggregateInput
            UserMinOrderByAggregateInput: Prisma.UserMinOrderByAggregateInput
            UserSumOrderByAggregateInput: Prisma.UserSumOrderByAggregateInput
            UserNullableScalarRelationFilter: Prisma.UserNullableScalarRelationFilter
            StringFieldUpdateOperationsInput: Prisma.StringFieldUpdateOperationsInput
            NullableStringFieldUpdateOperationsInput: Prisma.NullableStringFieldUpdateOperationsInput
            IntFieldUpdateOperationsInput: Prisma.IntFieldUpdateOperationsInput
            UserCreateNestedOneWithoutPostsInput: Prisma.UserCreateNestedOneWithoutPostsInput
            UserUpdateOneWithoutPostsNestedInput: Prisma.UserUpdateOneWithoutPostsNestedInput
            UserCreateWithoutPostsInput: Prisma.UserCreateWithoutPostsInput
            UserUncheckedCreateWithoutPostsInput: Prisma.UserUncheckedCreateWithoutPostsInput
            UserCreateOrConnectWithoutPostsInput: Prisma.UserCreateOrConnectWithoutPostsInput
            UserUpsertWithoutPostsInput: Prisma.UserUpsertWithoutPostsInput
            UserUpdateToOneWithWhereWithoutPostsInput: Prisma.UserUpdateToOneWithWhereWithoutPostsInput
            UserUpdateWithoutPostsInput: Prisma.UserUpdateWithoutPostsInput
            UserUncheckedUpdateWithoutPostsInput: Prisma.UserUncheckedUpdateWithoutPostsInput
        }
        Post: {
            PostWhereInput: Prisma.PostWhereInput
            PostOrderByWithRelationInput: Prisma.PostOrderByWithRelationInput
            PostWhereUniqueInput: Prisma.PostWhereUniqueInput
            PostOrderByWithAggregationInput: Prisma.PostOrderByWithAggregationInput
            PostScalarWhereWithAggregatesInput: Prisma.PostScalarWhereWithAggregatesInput
            PostCreateInput: Prisma.PostCreateInput
            PostUncheckedCreateInput: Prisma.PostUncheckedCreateInput
            PostUpdateInput: Prisma.PostUpdateInput
            PostUncheckedUpdateInput: Prisma.PostUncheckedUpdateInput
            PostCreateManyInput: Prisma.PostCreateManyInput
            PostUpdateManyMutationInput: Prisma.PostUpdateManyMutationInput
            PostUncheckedUpdateManyInput: Prisma.PostUncheckedUpdateManyInput
            PostListRelationFilter: Prisma.PostListRelationFilter
            PostOrderByRelationAggregateInput: Prisma.PostOrderByRelationAggregateInput
            PostCountOrderByAggregateInput: Prisma.PostCountOrderByAggregateInput
            PostAvgOrderByAggregateInput: Prisma.PostAvgOrderByAggregateInput
            PostMaxOrderByAggregateInput: Prisma.PostMaxOrderByAggregateInput
            PostMinOrderByAggregateInput: Prisma.PostMinOrderByAggregateInput
            PostSumOrderByAggregateInput: Prisma.PostSumOrderByAggregateInput
            PostCreateNestedManyWithoutAuthorInput: Prisma.PostCreateNestedManyWithoutAuthorInput
            PostUncheckedCreateNestedManyWithoutAuthorInput: Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput
            PostUpdateManyWithoutAuthorNestedInput: Prisma.PostUpdateManyWithoutAuthorNestedInput
            PostUncheckedUpdateManyWithoutAuthorNestedInput: Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput
            DateTimeFieldUpdateOperationsInput: Prisma.DateTimeFieldUpdateOperationsInput
            BoolFieldUpdateOperationsInput: Prisma.BoolFieldUpdateOperationsInput
            NullableIntFieldUpdateOperationsInput: Prisma.NullableIntFieldUpdateOperationsInput
            PostCreateWithoutAuthorInput: Prisma.PostCreateWithoutAuthorInput
            PostUncheckedCreateWithoutAuthorInput: Prisma.PostUncheckedCreateWithoutAuthorInput
            PostCreateOrConnectWithoutAuthorInput: Prisma.PostCreateOrConnectWithoutAuthorInput
            PostCreateManyAuthorInputEnvelope: Prisma.PostCreateManyAuthorInputEnvelope
            PostUpsertWithWhereUniqueWithoutAuthorInput: Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput
            PostUpdateWithWhereUniqueWithoutAuthorInput: Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput
            PostUpdateManyWithWhereWithoutAuthorInput: Prisma.PostUpdateManyWithWhereWithoutAuthorInput
            PostScalarWhereInput: Prisma.PostScalarWhereInput
            PostCreateManyAuthorInput: Prisma.PostCreateManyAuthorInput
            PostUpdateWithoutAuthorInput: Prisma.PostUpdateWithoutAuthorInput
            PostUncheckedUpdateWithoutAuthorInput: Prisma.PostUncheckedUpdateWithoutAuthorInput
            PostUncheckedUpdateManyWithoutAuthorInput: Prisma.PostUncheckedUpdateManyWithoutAuthorInput
        }
        others: {
            IntFilter: Prisma.IntFilter
            StringFilter: Prisma.StringFilter
            StringNullableFilter: Prisma.StringNullableFilter
            SortOrderInput: Prisma.SortOrderInput
            IntWithAggregatesFilter: Prisma.IntWithAggregatesFilter
            StringWithAggregatesFilter: Prisma.StringWithAggregatesFilter
            StringNullableWithAggregatesFilter: Prisma.StringNullableWithAggregatesFilter
            DateTimeFilter: Prisma.DateTimeFilter
            BoolFilter: Prisma.BoolFilter
            IntNullableFilter: Prisma.IntNullableFilter
            DateTimeWithAggregatesFilter: Prisma.DateTimeWithAggregatesFilter
            BoolWithAggregatesFilter: Prisma.BoolWithAggregatesFilter
            IntNullableWithAggregatesFilter: Prisma.IntNullableWithAggregatesFilter
            NestedIntFilter: Prisma.NestedIntFilter
            NestedStringFilter: Prisma.NestedStringFilter
            NestedStringNullableFilter: Prisma.NestedStringNullableFilter
            NestedIntWithAggregatesFilter: Prisma.NestedIntWithAggregatesFilter
            NestedFloatFilter: Prisma.NestedFloatFilter
            NestedStringWithAggregatesFilter: Prisma.NestedStringWithAggregatesFilter
            NestedStringNullableWithAggregatesFilter: Prisma.NestedStringNullableWithAggregatesFilter
            NestedIntNullableFilter: Prisma.NestedIntNullableFilter
            NestedDateTimeFilter: Prisma.NestedDateTimeFilter
            NestedBoolFilter: Prisma.NestedBoolFilter
            NestedDateTimeWithAggregatesFilter: Prisma.NestedDateTimeWithAggregatesFilter
            NestedBoolWithAggregatesFilter: Prisma.NestedBoolWithAggregatesFilter
            NestedIntNullableWithAggregatesFilter: Prisma.NestedIntNullableWithAggregatesFilter
            NestedFloatNullableFilter: Prisma.NestedFloatNullableFilter
        }
    }
}

export { IUser, IPost };
