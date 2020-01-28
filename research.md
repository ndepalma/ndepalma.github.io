---
layout: page
title: Research Projects
permalink: /research/
---
<h3>Completed Work </h3>
<hr />
<ul class="posts">

    {% for num in (200..210) %}
    	{% for res in site.research  %}
    		{% if res.num == num %}
                    <li>
                    <div class="twocol">
                    <div class="left_col">
                        <img src="{{ res.thumb | prepend: "/images/" | prepend: site.baseurl | prepend: site.url }}" width="200">
                    </div>
                    <div>
        		<a class="post-link" href="{{ res.url | prepend: site.baseurl | prepend: site.url }}">{{ res.title }}</a>
        		<p >{{res.excerpt}}</p>
                    </div>
                    </div>
       	            
        	    <hr />
                    </li>
      		{% endif %}
    	{% endfor %}
    {% endfor %}

</ul>


<br />
<h3>Work performed during my Masters </h3>
<hr />	
<ul class="posts">

	{% for num in (100..110) %}
    	{% for res in site.research  %}
    		{% if res.num == num %}
      		<li>
        		<a class="post-link" href="{{ res.url | prepend: site.baseurl | prepend: site.url }}">{{ res.title }}</a>
        		<p >{{res.excerpt}}</p>
        		<hr />
      		</li>
      		{% endif %}
    	{% endfor %}
    {% endfor %}
  </ul>

