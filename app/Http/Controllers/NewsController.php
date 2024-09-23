<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\{Event,Tag,Type};
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\EventUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;

class NewsController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function index(Request $request, $type = null){

        $user = auth()->user();

        $events = Event::with(['tag','type'])->get();

        $msg = '';
        if(isset($request->msg) && !empty($request->msg)){
            $msg = $request->msg;
        }

        $tags = Tag::all();
        
        return Inertia::render('Events/Events',compact('user','events','msg','tags','type'));
    }

    public function edit(Event $event, Request $request){        

        $user = auth()->user();

        $event->load('tag');

        $tags = Tag::all();
        $types = Type::all();

        $from = 'user.events';
        if(isset($request->from) && !empty($request->from)){
            $from = $request->from;
        }
        
        return Inertia::render('Events/EventEdit',compact('user','event','tags','types','from'));
    }

    public function create(Request $request){        

        $user = auth()->user();

        $event = null;

        $tags = Tag::all();
        $types = Type::all();

        $from = 'user.events';
        if(isset($request->from) && !empty($request->from)){
            $from = $request->from;
        }
        
        return Inertia::render('Events/EventEdit',compact('user','event','tags','types','from'));
    }

    public function editSave(EventUpdateRequest $request): RedirectResponse
    {

        $user = auth()->user();

        $values = $request->validated();

        if(!isset($values['time']) || empty($values['time'])){
            $values['time'] = '00:00';
        }

        $id = $values['id'];
        $from = $values['from'];
        $fullDate = $values['date'].' '.$values['time'].':00';
        $values['date'] = $fullDate;
        unset($values['id']);
        unset($values['from']);
        unset($values['time']);

        if(!isset($from) || empty($from)){
            $from = 'user.events';
        }

        // edit
        if(isset($id) && !empty($id)){
            
            $event = Event::find($id);

            if(isset($event) && !empty($event)){                               
                $event->update($values);            
            }

            //return Redirect::route('event.edit',$id);
            //return redirect(route('event.edit',$id).'?from='.$from);
            return redirect(route($from).'?msg=event.edited');
        }
        else{
            // create
            $values['user_id'] = $user->id;
            $id = Event::create($values);
            
            //return Redirect::route($from);
            return redirect(route($from).'?msg=event.created');
        }
    }
}