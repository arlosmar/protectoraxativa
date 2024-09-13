<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\{Group,Tag,Type};
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\GroupUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;

class GroupController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function index(Request $request, $type = null){

        $user = auth()->user();

        //$groups = Group::all();
        $groups = Group::with(['tag','type'])->get();

        $msg = '';
        if(isset($request->msg) && !empty($request->msg)){
            $msg = $request->msg;
        }

        $tags = Tag::all();
        
        return Inertia::render('Groups/Groups',compact('user','groups','msg','tags','type'));
    }

    public function edit(Group $group, Request $request){        

        $user = auth()->user();

        $group->load('tag');

        $tags = Tag::all();
        $types = Type::all();

        $from = 'user.groups';
        if(isset($request->from) && !empty($request->from)){
            $from = $request->from;
        }
        
        return Inertia::render('Groups/GroupEdit',compact('user','group','tags','types','from'));
    }

    public function create(Request $request){        

        $user = auth()->user();

        $group = null;

        $tags = Tag::all();
        $types = Type::all();

        $from = 'user.groups';
        if(isset($request->from) && !empty($request->from)){
            $from = $request->from;
        }
        
        return Inertia::render('Groups/GroupEdit',compact('user','group','tags','types','from'));
    }

    // to create or edit
    public function editSave(GroupUpdateRequest $request): RedirectResponse
    {

        $user = auth()->user();

        $values = $request->validated();

        $id = $values['id'];
        $from = $values['from'];
        unset($values['id']);
        unset($values['from']);

        if(!isset($from) || empty($from)){
            $from = 'user.groups';
        }

        // edit
        if(isset($id) && !empty($id)){
            
            $group = Group::find($id);

            if(isset($group) && !empty($group)){                   
                $group->update($values);            
            }

            //return Redirect::route('group.edit',$id);
            //return redirect(route('group.edit',$id).'?from='.$from);
            return redirect(route($from).'?msg=group.edited');        
        }
        else{
            // create            
            $values['user_id'] = $user->id;
            $id = Group::create($values);
            
            //return Redirect::route($from);
            return redirect(route($from).'?msg=group.created');
        }
    }
}