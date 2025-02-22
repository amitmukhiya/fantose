// pages/api/items.js

import dbConnect from '../../../lib/mongodb';
import User from '../../../models/Users';
import { NextRequest, NextResponse,  } from 'next/server';


export async  function   GET( req:NextRequest, res: NextResponse) {
  await dbConnect();
  console.log(req.body);


      try {
        const items = await User.find({});
        
        return Response.json({ success: true, data: items , status: 200});
        
      } catch (error) {
        console.log(error);
        return Response.json({ success: false , status: 400});
      }

      
      
}

export async function POST(req: Request , res:NextResponse) {
  await dbConnect();
  
  console.log('server side post');
  const body=await req.json();
  console.log(body);
  try {
    const isUserExist =
      (await
        User.findOne({
          email: body.email,
          
        })) !== null;
        console.log(isUserExist);
    if (isUserExist) {
      console.log(body)
      console.log(body.selectedNumbers)
      console.log(await User.updateOne (
        {
          email: body.email,
        },
        { $push : { "data.selectedNumbers": body.data.selectedNumbers[0]} }
      ))
      return Response.json({ success: true, status: 200 });
    }else{
      const items = await User.create(body);
    return Response.json({ success: true, data: items, status: 201 });
    }
    
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, status: 400 });
  }
}