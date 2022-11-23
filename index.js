function main() {
    async function removeCitation() {
        const currentBlock = await logseq.Editor.getCurrentBlock();
        const currentContent = currentBlock.content;
        console.log(currentContent);
        const firstSign = "Excerpt From";
        const secondSign = "This material may be protected by copyright.";

        if (currentContent.includes(firstSign) && currentContent.includes(secondSign)) {
            const deletedPart = currentContent.substring(currentContent.indexOf(firstSign), currentContent.indexOf(secondSign) + secondSign.length);

            console.log(deletedPart);
            
            const temp = currentContent.replace(deletedPart, "");

            const updatedContent = temp.substring(0, temp.lastIndexOf("\n\n")) + temp.substring(temp.lastIndexOf("\n\n")+2, temp.length);

            await logseq.Editor.updateBlock(currentBlock.uuid, updatedContent);
        }
    }

    logseq.App.registerCommandShortcut(
        {
            binding: "mod+v"
        }, () => {
            setTimeout(removeCitation, 600);
        }
    )
}

logseq.ready(main).catch(console.error);