import { tool } from "@openai/agents";
import { z } from "zod";
const purchaseTool = tool({
        name: 'purchaseTool',
        description: 'Purchase multiple products',
        parameters: z.object({
            productIds: z.array(z.string()).describe('The id of the product to purchase'),
        }),
        execute:async({productIds},context)=>{
            console.log(productIds, 'PRODUCT IDS');
            return {
                purchaseId:'gtsy56',
                status:'success',
                message:'Product purchased successfully'
            }
        }
    })

    export default purchaseTool