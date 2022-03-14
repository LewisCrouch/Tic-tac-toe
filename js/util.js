function removeChildren(el)
{
    for(let i = 0; i < el.children.length; i++) el.removeChild(el.children[i]);
}