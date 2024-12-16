"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspaceSchema } from "../schemas";
import  Image  from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { DottedSaperator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";



interface createWorkspaceFormProps {
    onCancel?: () => void;

}


export const CreateWorkspaceForm = ({ onCancel }: createWorkspaceFormProps) => {
    const{mutate, isPending} = useCreateWorkspace();


    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema> ) => {

        const finalValues = {
            ...values,
            image: values.image  instanceof File ? values.image : ""
        }

        mutate({form: finalValues});
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            form.setValue("image", file);
        }
    }


    return(
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold"> 
                    Create a new workspace
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSaperator/>
            </div>
            <CardContent className="p-7">
                <Form  {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Workspace Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter workspace name"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({field}) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-5">
                                            {field .value ? (
                                                <div className="size-[72px] relative rounded-md overflow-hidden">
                                                    <Image
                                                        alt="Logo"
                                                        fill
                                                        className="object-cover"
                                                        src={
                                                            field.value instanceof File
                                                            ? URL.createObjectURL(field.value)
                                                            : field.value
                                                        }
                                                    />
                                                </div>
                                            ): (
                                                <Avatar className="size-[72px]">
                                                    <AvatarFallback>
                                                        <ImageIcon className="size-[36px] text-neutral-400" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-small ">
                                                    Workspace Icon
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Supported Formats: JPG, JPEG, PNG, SVG
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Max supported file size: 1MB
                                                </p>
                                                <input
                                                    className="hidden"
                                                    type="file"
                                                    accept=".jpg, .jpeg, .png, .svg"
                                                    ref={inputRef}
                                                    disabled={isPending}
                                                    onChange={handleImageChange}
                                                />
                                                <Button 
                                                    type="button"
                                                    disabled={isPending}
                                                    variant="teritary"
                                                    size="xs"
                                                    className="w-fit mt-2"

                                                    onClick={() => {inputRef.current?.click()}}
                                                >
                                                    Upload Image
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <DottedSaperator className="py-7" />
                        <div className="flex items-center justify-between">
                            <Button 
                                type="button"
                                size="lg"
                                variant="secondary"
                                onClick={onCancel} 
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                size="lg"
                                variant="primary"
                                disabled={isPending}
                            >
                                Create Workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}