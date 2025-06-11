import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log("Form data submitted:", data);
        console.log("Existing post:", post);
        console.log("User data:", userData);

        try {
            if (post) {
                console.log("Attempting to update post...");
                let file = null;
                if (data.image[0]) {
                    try {
                        file = await appwriteService.uploadFile(data.image[0]);
                        console.log("File uploaded (update):", file);
                    } catch (uploadError) {
                        console.error("Error uploading file (update):", uploadError);
                        // Optionally, set an error state here
                        return;
                    }
                }

                if (file && post.featuredImage) {
                    try {
                        console.log("Deleting old featured image:", post.featuredImage);
                        await appwriteService.deleteFile(post.featuredImage);
                    } catch (deleteError) {
                        console.error("Error deleting old file (update):", deleteError);
                        // Continue even if delete fails, as new file is uploaded
                    }
                }
                
                let dbPost = null;
                try {
                    dbPost = await appwriteService.updatePost(post.$id, {
                        ...data,
                        featuredImage: file ? file.$id : undefined,
                    });
                    console.log("Post updated in DB:", dbPost);
                } catch (updateError) {
                    console.error("Error updating post in DB:", updateError);
                    // Optionally, set an error state here
                    return;
                }

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                console.log("Attempting to create new post...");
                if (!data.image[0]) {
                    console.error("No image selected for new post.");
                    // Optionally, set an error state here to inform the user
                    return;
                }

                let file = null;
                try {
                    file = await appwriteService.uploadFile(data.image[0]);
                    console.log("File uploaded (create):", file);
                } catch (uploadError) {
                    console.error("Error uploading file (create):", uploadError);
                    // Optionally, set an error state here
                    return;
                }
                
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    if (!userData || !userData.$id) {
                        console.error("User data or user ID is missing for create post.");
                        // Optionally, set an error state here
                        return;
                    }

                    let dbPost = null;
                    try {
                        dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                        console.log("Post created in DB:", dbPost);
                    } catch (createError) {
                        console.error("Error creating post in DB:", createError);
                        // Optionally, set an error state here
                        return;
                    }

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                } else {
                    console.error("File upload failed for new post (file object is null).");
                    // Optionally, set an error state here
                }
            }
        } catch (error) {
            console.error("Overall error during post submission:", error);
            // This will catch errors not caught by more specific try-catch blocks
            // e.g., setError(error.message);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

PostForm.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        $id: PropTypes.string,
        content: PropTypes.string,
        status: PropTypes.string,
        featuredImage: PropTypes.string
    })
};
